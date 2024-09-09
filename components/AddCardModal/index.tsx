import React, { useState } from "react";
import { SafeAreaView } from "react-native";

import SelectCard from "./SelectCard";
import ScanCardPage from "./ScanCard";
import FinalizeCard from "./FinalizeCard";
import { CardType } from "../Card";

const AddCardModal: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const [currentPage, setCurrentPage] = useState("list"); // 'list' or 'add'

    const [card, setCard] = useState<CardType>({
        color: "#AEC6CF",
        imageUri: null,
        isKnownBrand: false,
        title: "",
        number: "",
        type: "",
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "black", width: "100%", alignItems: "center" }}>
            {currentPage === "list" && (
                <SelectCard
                    onAddNewCard={() => {
                        // transitionToPage("createNewCard");
                        setCurrentPage("finalize");
                    }}
                    onAddKnownCard={(card) => {
                        //SetBarcode Data
                        setCurrentPage("scanCard");
                        setCard(card);
                    }}
                />
            )}
            {currentPage === "scanCard" && (
                <ScanCardPage
                    onBack={() => {
                        setCurrentPage("list");
                    }}
                    onCardScanned={(barcode) => {
                        setCard((prev) => ({
                            ...prev,
                            number: barcode.data,
                            type: barcode.type,
                        }));
                        setCurrentPage("finalize");
                    }}
                />
            )}
            {currentPage === "finalize" && (
                <FinalizeCard
                    card={card}
                    onBack={() => {
                        setCurrentPage("scanCard");
                    }}
                    onFinalize={(card) => {
                        console.log(`Card to Add`, card);
                        onSuccess();
                    }}
                />
            )}
        </SafeAreaView>
    );
};

export default AddCardModal;
