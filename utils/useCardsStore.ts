import {create} from "zustand";
import { MMKV } from "react-native-mmkv";
import { CardType } from "@/components/Card";

// Initialize MMKV
const storage = new MMKV();

interface CardStore {
    cards: CardType[];
    addCard: (card: CardType) => void;
    loadCards: () => void;
    reset: () => void;
}

// Zustand Store in TypeScript
export const useCardStore = create<CardStore>((set) => ({
    cards: [],
    addCard: (card) => {
        set((state) => {
            const updatedCards = [...state.cards, card];
            storage.set("cards", JSON.stringify(updatedCards)); // Save to MMKV
            return { cards: updatedCards };
        });
    },
    reset: ()=>{
        set(() => {
            storage.set("cards", JSON.stringify([])); // Save to MMKV
            return { cards: [] };
        });
    },
    loadCards: () => {
        const savedCards = storage.getString("cards");
        if (savedCards) {
            set({ cards: JSON.parse(savedCards) }); // Hydrate Zustand store with MMKV data
        }
    },
}));
