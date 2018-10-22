import { randomInRange } from "../components/Player/utils";

type VoiceMap = {|
    +name: string,
    +lang: string,
|};

type OnReady = (voiceMap: VoiceMap[]) => void;
type OnProgress = (id: string, progress: number) => void;
type OnEnd = () => void;

type ReaderProps = {|
    +onProgress: OnProgress,
    +onEnd: OnEnd,
    +onReady: OnReady,
|}

export class Reader {
    isReady: boolean;
    newsProgressInterval: IntervalID | null;
    onProgress: OnProgress;
    onEnd: OnEnd;
    synth: SpeechSynthesis;
    voices: SpeechSynthesisVoice[];
    constructor({ onReady, onProgress, onEnd }: ReaderProps) {
        this.isReady = false;
        this.newsProgressInterval = null;
        this.onProgress = onProgress;
        this.onEnd = onEnd;
        this.synth = window.speechSynthesis;
        this.voices = this.getRussianVoices();
        if (!this.voices.length) {
            this.synth.addEventListener("voiceschanged", () => {
                // this check is needed because "voiceschanged" is fired several times
                if (!this.isReady) {
                    this.voices = this.getRussianVoices();
                    this.isReady = true;
                    onReady(this.getVoicesMap());
                }
            });
        } else {
            this.isReady = true;
            onReady(this.getVoicesMap());
        }
    }

    read(text: string, id: string) {
        if (!this.isReady) {
            console.error("Reader is not ready yet");
            return;
        }
        const voiceName = this.voices[Math.round(randomInRange(0, this.voices.length - 1))].name;
        const pitch = randomInRange(0.7, 1.1);
        const rate = randomInRange(0.9, 1);

        const utterance: SpeechSynthesisUtterance = new window.SpeechSynthesisUtterance(text);
        utterance.voice = this.voices.find(voice => voice.name === voiceName) || this.voices[0];
        utterance.pitch = pitch;
        utterance.rate = rate;

        this.stop();
        this.synth.speak(utterance);

        const approximateDurationMS = text.length * 40;
        const intervalDuration = 100;
        let progressIterationIndex = 0;
        this.newsProgressInterval = setInterval(() => {
            progressIterationIndex += 1;
            const progress = Math.min(1, progressIterationIndex * intervalDuration / approximateDurationMS);
            if (progress === 1) {
                this.endProgress();
            } else {
                this.onProgress(id, progress);
            }
        }, intervalDuration);
    }

    stop() {
        this.synth.cancel();
        this.endProgress();
    }

    endProgress() {
        if (this.newsProgressInterval !== null) {
            clearInterval(this.newsProgressInterval);
        }
        this.onEnd();
    }

    getRussianVoices(): SpeechSynthesisVoice[] {
        return this.synth.getVoices().filter(voice => voice.lang.startsWith("ru") && voice.localService);
    }

    getVoicesMap(): VoiceMap[] {
        return this.voices.map(voice => ({
            name: voice.name,
            lang: voice.lang,
        }));
    }
}
