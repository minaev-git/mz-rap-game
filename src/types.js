export type LoopStateEnum = "off" | "loading" | "nextOn" | "nextOff" | "active";

export type Category = {|
    id: string,
    name: string,
    color: string,
|};

export type Loop = {|
    id: string,
    categoryId: string,
    groupId: string,
    src: string,
    state: LoopStateEnum,
|};

export type News = {|
    id: string,
    link: string,
    text: string,
|};
