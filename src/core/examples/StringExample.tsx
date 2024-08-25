import AutoComplete, {Adapter} from "core/AutoComplete";
import React, {FC, useState} from "react";

const items: string[] = [
    "New York",
    "London",
    "Mexico City",
    "Los Angeles",
    "Tokyo",
    "Chicago",
    "Sao Paulo",
    "Mumbai",
    "Buesnos Aires"
];

class StringAdapter implements Adapter<string> {

    private readonly items: string[];

    constructor(items: string[]) {
        this.items = items;
    }

    filter(input: string, item: string): boolean {
        return item.toLowerCase().includes(input.toLowerCase());
    }

    renderId(item: string): string | number {
        return this.getId(item);
    }

    renderText(item: string): string {
        return item;
    }

    private getId(item: string): number {
        const index = this.items.findIndex(it => it === item);

        if (index == -1) {
            throw new Error("Unknown item: " + item);
        }

        return index + 1;
    }
}

const TITLE = "String Example";

const StringExample: FC = () => {
    const [value, setValue] = useState<string | undefined>();

    return (
        <div>
            <p>
                {TITLE}
            </p>
            <div style={{display: "flex"}}>
                <AutoComplete<string>
                    items={items}
                    adapter={new StringAdapter(items)}
                    onChange={setValue}
                />
                <button
                    onClick={() => {
                        console.log(TITLE, value);
                    }}
                >
                    Print value
                </button>
            </div>
        </div>
    );
};

export default StringExample;
