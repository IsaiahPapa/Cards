import { create } from "zustand";
import { MMKV } from "react-native-mmkv";
import { CardType } from "@/components/Card";

import { debounce } from "lodash";

// Initialize MMKV
const storage = new MMKV();

interface CardStore {
    cards: CardType[];
    addCard: (card: CardType) => void;
    loadCards: () => void;
    reset: () => void;
    getCard: (id: CardType["id"]) => CardType | undefined;
    editCard: (id: string, updatedCardData: Partial<CardType>) => void;
}

const debouncedSaveToMMKV = debounce((cards: CardType[]) => {
    storage.set("cards", JSON.stringify(cards));
}, 500); // 5

// Zustand Store in TypeScript
export const useCardStore = create<CardStore>((set, get) => ({
    cards: [],
    addCard: (card) => {
        set((state) => {
            const updatedCards = [...state.cards, card];
            storage.set("cards", JSON.stringify(updatedCards)); // Save to MMKV
            return { cards: updatedCards };
        });
    },
    reset: () => {
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

    getCard: (id) => {
        const cards = get().cards.filter((card) => card.id === id);
        if (cards.length === 0) return;
        return cards[0];
    },

    editCard: (id, updatedCardData) => {
        set((state) => {
            const updatedCards = state.cards.map((card) =>
                card.id === id ? { ...card, ...updatedCardData } : card
            );
            debouncedSaveToMMKV(updatedCards);
            return { cards: updatedCards };
        });
    },
}));
