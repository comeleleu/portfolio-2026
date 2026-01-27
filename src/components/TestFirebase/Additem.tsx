import { useState } from "react";
import db from "../../utils/firestore";
import { collection, addDoc } from "firebase/firestore";

const AddItem = () => {
    const [value, setValue] = useState("");

    const handleSublit = async (event) => {
        event.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "items"), {
                name: value,
            });
            console.log("Document written with ID: ", docRef.id);
            setValue("");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    return (
        <form onSubmit={handleSublit} className="my-4">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Add a new item"
                className="border p-2 rounded-lg mr-4"
            />
            <button type="submit">Add Item</button>
        </form>
    )
}

export default AddItem;