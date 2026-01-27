"use client"

import { useState, useEffect } from "react";
import db from "../../utils/firestore";
import { collection, getDocs } from "firebase/firestore";

const ListItemms = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const querySnapshot = await getDocs(collection(db, "items"));
            setItems(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        fetchItems();
    }, []);

    return (
        <div>
            <h2>Items</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default ListItemms;