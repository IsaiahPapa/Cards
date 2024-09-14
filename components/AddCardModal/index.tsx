import React, { useState } from "react";
import { SafeAreaView, useColorScheme } from "react-native";

import SelectCard from "./SelectCard";
import ScanCardPage from "./ScanCard";
import FinalizeCard from "./FinalizeCard";
import { CardType } from "../Card";
import { useCardStore } from "@/utils/useCardsStore";
import uuid from "react-native-uuid";

const AddCardModal: React.FC<{ onSuccess: () => void; onClose(): void }> = ({
    onSuccess,
    onClose,
}) => {
    const [currentPage, setCurrentPage] = useState("list"); // 'list' or 'add'

    const [card, setCard] = useState<CardType>({
        id: uuid.v4().toString(),
        color: "#AEC6CF",
        imageUri: null,
        isKnownBrand: false,
        title: "",
        number: "",
        type: "",
        notes: "",
        locations: [],
        photos: [],
    });

    const theme = useColorScheme() ?? "dark";
    const { addCard } = useCardStore();

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme === "dark" ? "black" : "white",
                width: "100%",
                alignItems: "center",
            }}
        >
            {currentPage === "list" && (
                <SelectCard
                    onAddNewCard={() => {
                        setCurrentPage("scanCard");
                    }}
                    onAddKnownCard={(card) => {
                        //SetBarcode Data
                        setCard((prev) => ({
                            ...prev,
                            ...card,
                        }));
                        setCurrentPage("scanCard");
                    }}
                />
            )}
            {currentPage === "scanCard" && (
                <ScanCardPage
                    onBack={() => {
                        setCurrentPage("list");
                    }}
                    onEnterManually={() => {
                        setCurrentPage("finalize");
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
                    onClose={onClose}
                    onBack={()=>{
                        setCurrentPage("list")
                    }}
                    onDone={() => {
                        console.log(`Card to Add`, card);
                        addCard(card);
                        onSuccess();
                    }}
                    onCardUpdate={(updates) => {
                        setCard((prev) => ({
                            ...prev,
                            ...updates,
                        }));
                    }}
                />
            )}
        </SafeAreaView>
    );
};

export default AddCardModal;
