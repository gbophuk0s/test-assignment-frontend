import "core/App.css";
import BooksExample from "core/examples/BooksExample";
import FormExample from "core/examples/FormExample";
import StringExample from "core/examples/StringExample";
import React, {FC} from "react";

const App: FC = () => {
    return (
        <div className="container">
            <div className="examples-container">
                <FormExample/>
                <BooksExample/>
                <StringExample/>
            </div>
        </div>
    );
};

export default App;
