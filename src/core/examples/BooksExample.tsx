import AutoComplete, {Adapter} from "core/AutoComplete";
import React, {FC, useState} from "react";

interface Book {
    id: number;
    title: string;
}

const books: Book[] = [
    {id: 1, title: "Gone with the Wind"},
    {id: 2, title: "The Book Thief"},
    {id: 3, title: "The Red Tent"},
    {id: 4, title: "Girl with a Pearl Earring"},
    {id: 5, title: "Shogun (Asian Saga, #1)"},
    {id: 6, title: "Dragonfly in Amber (Outlander, #2)"},
    {id: 7, title: "Lonesome Dove (Lonesome Dove, #1)"},
    {id: 8, title: "Atonement"},
    {id: 9, title: "One Hundred Years of Solitude"},
    {id: 10, title: "Year of Wonders"}
];

class BookAdapter implements Adapter<Book> {

    filter(input: string, item: Book): boolean {
        return item.title.toLowerCase().includes(input.toLowerCase());
    }

    renderId(item: Book): string | number {
        return item.id;
    }

    renderText(item: Book): string {
        return item.title;
    }

}

const TITLE = "Custom object Example";

const BooksExample: FC = () => {
    const [value, setValue] = useState<Book | undefined>();

    return (
        <div>
            <p>{TITLE}</p>
            <div style={{display: "flex"}}>
                <AutoComplete<Book>
                    items={books}
                    adapter={new BookAdapter()}
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

export default BooksExample;
