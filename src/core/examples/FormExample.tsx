import AutoComplete, {Adapter} from "core/AutoComplete";
import React, {FC} from "react";

interface Option {
    id: number;
    value: string;
}

const options: Option[] = [
    {id: 1, value: "Lorem ipsum dolor sit amet"},
    {id: 2, value: "Fusce gravida mauris lectus"},
    {id: 3, value: "Sed sapien augue rutrum vel mattis et"},
    {id: 4, value: "Amet erat ac"},
    {id: 5, value: "Fringilla aliquet diam Donec mollis"},
    {id: 6, value: "Ornare mi massa rhoncus s"}
];

class OptionAdapter implements Adapter<Option>{

    filter(input: string, item: Option): boolean {
        return item.value.toLowerCase().includes(input.toLowerCase());
    }

    renderId(item: Option): string | number {
        return item.id;
    }

    renderText(item: Option): string {
        return item.value;
    }

}

const TITLE = "Form Example";

const FormExample: FC = () => {
    return (
        <div>
            <p>{TITLE}</p>
            <form style={{display: "flex"}}>
                <AutoComplete<Option>
                    name="autocomplete"
                    items={options}
                    adapter={new OptionAdapter()}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormExample;
