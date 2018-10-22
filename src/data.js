import { LoopState } from "./consts";
import type { Category, Loop, News } from "./types";

import beat01 from "../assets/beat_01.mp3";
import beat02 from "../assets/beat_02.mp3";
import beat03 from "../assets/beat_03.mp3";
import beat04 from "../assets/beat_04.mp3";
import hihats01 from "../assets/hihats_01.mp3";
import hihats02 from "../assets/hihats_02.mp3";
import hihats03 from "../assets/hihats_03.mp3";
import hihats04 from "../assets/hihats_04.mp3";
import bass01 from "../assets/bass_01.mp3";
import bass02 from "../assets/bass_02.mp3";
import bass03 from "../assets/bass_03.mp3";
import bass04 from "../assets/bass_04.mp3";
import tune01 from "../assets/tune_01.mp3";
import tune02 from "../assets/tune_02.mp3";
import tune03 from "../assets/tune_03.mp3";
import tune04 from "../assets/tune_04.mp3";

export const categories: Category[] = [
    {
        id: "beats",
        name: "Бит",
        color: "#af5c14",
    },
    {
        id: "hihats",
        name: "Хай-хэт",
        color: "#be8b1a",
    },
    {
        id: "bass",
        name: "Бас",
        color: "#3462c3",
    },
    {
        id: "tune",
        name: "Синт",
        color: "#7b45af",
    },
];

export const loops: Loop[] = [
    {
        id: "bt1",
        categoryId: "beats",
        groupId: "beats",
        src: beat01,
        state: LoopState.Loading,
    },
    {
        id: "bt2",
        categoryId: "beats",
        groupId: "beats",
        src: beat02,
        state: LoopState.Loading,
    },
    {
        id: "bt3",
        categoryId: "beats",
        groupId: "beats",
        src: beat03,
        state: LoopState.Loading,
    },
    {
        id: "bt4",
        categoryId: "beats",
        groupId: "beats",
        src: beat04,
        state: LoopState.Loading,
    },
    {
        id: "h1",
        categoryId: "hihats",
        groupId: "hihats",
        src: hihats01,
        state: LoopState.Loading,
    },
    {
        id: "h2",
        categoryId: "hihats",
        groupId: "hihats",
        src: hihats02,
        state: LoopState.Loading,
    },
    {
        id: "h3",
        categoryId: "hihats",
        groupId: "hihats",
        src: hihats03,
        state: LoopState.Loading,
    },
    {
        id: "h4",
        categoryId: "hihats",
        groupId: "hihats",
        src: hihats04,
        state: LoopState.Loading,
    },
    {
        id: "b1",
        categoryId: "bass",
        groupId: "bass",
        src: bass01,
        state: LoopState.Loading,
    },
    {
        id: "b2",
        categoryId: "bass",
        groupId: "bass",
        src: bass02,
        state: LoopState.Loading,
    },
    {
        id: "b3",
        categoryId: "bass",
        groupId: "bass",
        src: bass03,
        state: LoopState.Loading,
    },
    {
        id: "b4",
        categoryId: "bass",
        groupId: "bass",
        src: bass04,
        state: LoopState.Loading,
    },
    {
        id: "t1",
        categoryId: "tune",
        groupId: "tune",
        src: tune01,
        state: LoopState.Loading,
    },
    {
        id: "t2",
        categoryId: "tune",
        groupId: "tune",
        src: tune02,
        state: LoopState.Loading,
    },
    {
        id: "t3",
        categoryId: "tune",
        groupId: "tune",
        src: tune03,
        state: LoopState.Loading,
    },
    {
        id: "t4",
        categoryId: "tune",
        groupId: "tune",
        src: tune04,
        state: LoopState.Loading,
    },
];

export const news: News[] = [
    // {
    //     id: "0",
    //     link: "https://zona.media/news/2018/09/17/urlashov",
    //     text: "Путин отказался помиловать экс-мэра Ярославля Урлашова",
    // },
    // {
    //     id: "1",
    //     link: "https://zona.media/news/2018/09/17/nenasheva",
    //     text: "Художницу Катрин Ненашеву задержали в центре Москвы во время акции против пыток",
    // },
    // {
    //     id: "2",
    //     link: "https://zona.media/news/2018/09/17/sagynbaev",
    //     text: "Тяжелобольного фигуранта «пензенского дела» поместили в карцер после отказа от признательных показаний и рассказа о пытках",
    // }
    {
        id: "0",
        link: "https://zona.media/news/2018/10/14/free",
        text: "Навальный вышел на свободу после 50 суток ареста",
    },
    {
        id: "1",
        link: "https://zona.media/news/2018/10/13/fire",
        text: "В Москве подожгли храм и воскресную школу",
    },
    {
        id: "2",
        link: "https://zona.media/news/2018/10/08/masha",
        text: "В Красноярском крае пенсионерку обязали выплатить 160 тысяч рублей за продажу односельчанам самодельных «Маши и медведя»",
    },
    {
        id: "3",
        link: "https://zona.media/news/2018/10/09/school",
        text: "В новосибирской школе девятиклассник напал с ножом на сверстника",
    },
    {
        id: "4",
        link: "https://zona.media/news/2018/10/05/mailru-jokes",
        text: "Вице-президент Mail.ru предложил создать орган, проверяющий шутки на экстремизм",
    },
    {
        id: "5",
        link: "https://zona.media/news/2018/10/03/shagdarov",
        text: "В Забайкалье следователя заподозрили в хищении вещдоков по делу о хищении вещдоков",
    },
    {
        id: "6",
        link: "https://zona.media/news/2018/10/01/policemen",
        text: "В Москве двое полицейских задержаны за стрельбу из травматического пистолета по прохожему",
    },
    {
        id: "7",
        link: "https://zona.media/news/2018/09/19/karaoke",
        text: "Троих жителей Чебоксар заподозрили в нападении на полицейских после драки в караоке",
    },
    {
        id: "8",
        link: "https://zona.media/news/2018/09/18/hm",
        text: "В Брянской области пресвитера адвентистов оштрафовали после жалобы православной местной жительницы",
    },
    {
        id: "9",
        link: "https://zona.media/news/2018/09/11/hutorok",
        text: "В Краснодаре после конфликта лесоруба и местной жительницы, выступающей против вырубки леса, один судья осудил обоих",
    },
    {
        id: "10",
        link: "https://zona.media/news/2018/09/07/sledovatel-bik",
        text: "Волгоградского следователя, пообещавшего разбить голову пожилой потерпевшей, заподозрили в превышении полномочий",
    },
    {
        id: "11",
        link: "https://zona.media/news/2018/09/06/90s",
        text: "В Подмосковье пятерых человек арестовали по обвинению в похищении предпринимателей",
    },
];
