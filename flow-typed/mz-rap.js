declare var module : {
    hot : {
        accept(path:string, callback:() => void): void;
    };
};

declare class SpeechSynthesisVoice {
    name: string;
    lang: string;
    localService: boolean;
    constructor(): SpeechSynthesisVoice;
}

declare class SpeechSynthesisUtterance {
    voice: SpeechSynthesisVoice;
    pitch: number;
    rate: number;
    constructor(text: string): SpeechSynthesisUtterance;
}

declare class SpeechSynthesis extends EventTarget {
    constructor(): SpeechSynthesis;
    speak(utterance: SpeechSynthesisUtterance): void;
    cancel(): void;
    getVoices(): SpeechSynthesisVoice[];
}
