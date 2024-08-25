import React, {useState} from "react";

export interface Adapter<T> {

    renderId(item: T): string;

    renderText(item: T): string;

    filter(input: string, item: T): boolean;

}

interface Props<T> {

    items: T[];

    adapter: Adapter<T>;

    initialValue?: T;

    onChange?: (value: T) => void;

}

interface ViewOption<T> {

    id: string;

    text: string;

    value?: T;

}

const AutoComplete = <T, >(props: Props<T>) => {
    const adapter = props.adapter;
    const items = props.items;
    const initialValue = props.initialValue;
    const onChange = props.onChange;

    const [text, setText] = useState<string>(() => initialValue != null ? adapter.renderText(initialValue) : "");
    const handleOnClick = (option: ViewOption<T>) => {
        handleChange(option.text);
        onChange?.(option.value);
    };

    const handleChange = (value: string) => {
        setText(value);
    };

    const viewOptions: ViewOption<T>[] = items
        .filter(it => adapter.filter(text, it))
        .map(it => ({
            id: adapter.renderId(it),
            text: adapter.renderText(it),
            value: it
        }));

    return (
        <div className="autocomplete-container">
            <input
                className="autocomplete-input"
                list="options"
                value={text}
                onChange={(e) => {
                    handleChange(e.currentTarget.value);
                }}
            />
            {text.length > 0 && viewOptions.length > 1 && (
                <ul className="autocomplete-options-container">
                    {viewOptions.map(it => (
                        <li
                            className="autocomplete-options-container-option"
                            key={it.id}
                            onClick={() => handleOnClick(it)}
                        >
                            {it.text}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoComplete;
