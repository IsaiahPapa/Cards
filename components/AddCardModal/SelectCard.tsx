import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    SectionList,
    GestureResponderEvent,
} from "react-native";
import { CardType } from "../Card";

const cards = [
    {
        id: 1,
        title: "Costco",
        logoUri: "https://www.costco.com/wcsstore/CostcoGLOBALSAS/images/membership-card-business.png",
    },
    {
        id: 2,
        title: "CVS",
        logoUri:
            "https://res.cloudinary.com/gift-card-granny/image/upload/f_auto/ar_79:50,c_scale,w_237/v1/GCG/merchants/cvs-gift-card?_a=AAADKDP",
        group: "Frequently added",
    },
    {
        id: 3,
        title: "Starbucks",
        logoUri: "https://globalassets.starbucks.com/digitalassets/cards/fy20/BrailleFY20.jpg",
    },
    {
        id: 4,
        title: "Shell",
        logoUri:
            "https://ed0c37be21f8ad72418b-ae99f0738c1a4f0c153c7aecac9360e1.ssl.cf1.rackcdn.com/frn-card-nitro.png",
    },
    {
        id: 6,
        title: "Target",
        logoUri: "https://target.scene7.com/is/image/Target/GUEST_9db0ad32-4da8-47b3-b7c3-c42f2fee981d",
    },
    {
        id: 7,
        title: "Best Buy",
        logoUri:
            "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/1e8ee7e7-6258-48b2-942a-49e42422a5be.jpg",
        group: "Tech",
    },
    {
        id: 8,
        title: "Kroger",
        logoUri:
            "https://www.kroger.com/content/v2/binary/image/pr/free-membership/imageset/4424732_22_p11_lp_loyalty_seba_freemembership_kroger--4424732_22_p11_lp_loyalty_seba_freemembership_mbl_640x424_kroger.jpg",
    },
    {
        id: 9,
        title: "Sephora",
        logoUri: "https://content.blackhawknetwork.com/gcmimages/product/xxlarge/89524.png?dt=1614280975777",
        group: "Beauty",
    },
    {
        id: 10,
        title: "GameStop",
        logoUri:
            "https://scratchmonkeys.com/image/cache/catalog/Product%20Images/GameStop/gamestop-gift-card-5-max-300.png",
        group: "Gaming",
    },
    {
        id: 11,
        title: "PetSmart",
        logoUri: "https://irresistiblepets.net/wp-content/uploads/2012/03/petperks.png",
    },
    {
        id: 12,
        title: "Terra Firma Bouldering",
        logoUri: "https://i.imgur.com/7fkx9Ht.png",
    },
    { id: 13, title: "YMCA", logoUri: "https://i.imgur.com/4hqnnh8.png" },
];

// Define types for your card and props
type KnownCard = {
    id: number;
    title: string;
    logoUri: string;
};

// Assuming AddNewCardButton and CardItem are defined with appropriate types elsewhere in your code
const CardItem = ({ card }: { card: KnownCard }) => (
    <View className="flex-row items-center bg-neutral-800 p-2 rounded-lg min-w-36">
        <Image source={{ uri: card.logoUri }} className="w-20 aspect-[1.6] mr-4 rounded-md" />
        <Text className="text-white">{card.title}</Text>
    </View>
);
const AddNewCardButton: React.FC<{ onAddCard: (event: GestureResponderEvent) => void }> = ({ onAddCard }) => {
    return (
        <TouchableOpacity
            onPress={onAddCard}
            className="flex-row items-center bg-neutral-800 p-2 rounded-lg min-w-36"
        >
            <View
                style={{ borderColor: "rgba(255, 255, 255, .5)" }}
                className="w-20 aspect-[1.6] border-white border-opacity-50 border-2 rounded-lg mr-4 items-center justify-center"
            >
                <FontAwesome name="plus" size={20} style={{ opacity: 0.5 }} color={"white"} />
            </View>
            <Text className="text-lg text-white">Add Card</Text>
        </TouchableOpacity>
    );
};

const SelectCard: React.FC<{
    onAddNewCard: (event: GestureResponderEvent) => void;
    onAddKnownCard: (card: CardType) => void;
}> = ({ onAddNewCard, onAddKnownCard }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const renderHeader = useMemo(
        () => (
            <>
                <View
                    style={{
                        width: "25%",
                        height: 6,
                        marginTop: 8,
                        backgroundColor: "#ccc",
                        borderRadius: 3,
                        alignSelf: "center",
                        marginBottom: 16,
                    }}
                />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#666",
                        padding: 12,
                        borderRadius: 8,
                        marginBottom: 16,
                    }}
                >
                    <Ionicons name="search" size={16} color="#ccc" style={{ marginRight: 8 }} />
                    <TextInput
                        placeholder="Search card"
                        placeholderTextColor="#ccc"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={{ flex: 1, color: "white", fontSize: 16 }}
                    />
                </View>
                <AddNewCardButton onAddCard={onAddNewCard} />
            </>
        ),
        [searchQuery, setSearchQuery]
    ); // Dependencies that trigger re-render

    const sections = useMemo(() => {
        const filteredCards = cards.filter((card) =>
            card.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const grouped = filteredCards.reduce(
            (acc: { [key: string]: { title: string; data: KnownCard[] } }, card) => {
                const firstLetter = card.title[0].toUpperCase();
                if (!acc[firstLetter]) {
                    acc[firstLetter] = { title: firstLetter, data: [] };
                }
                acc[firstLetter].data.push(card);
                return acc;
            },
            {}
        );

        return Object.values(grouped).sort((a, b) => a.title.localeCompare(b.title));
    }, [cards, searchQuery]); // Include searchQuery in dependencies

    const sectionData = Object.values(sections).sort((a, b) => a.title.localeCompare(b.title));

    return (
        <>
            <SectionList<KnownCard>
                className="w-full"
                data={sectionData}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                onAddKnownCard({
                                    color: "",
                                    imageUri: item.logoUri,
                                    isKnownBrand: true,
                                    title: item.title,
                                    number: "",
                                    type: "",
                                });
                            }}
                            className="flex-row items-center bg-neutral-800 p-2 rounded-lg min-w-36"
                        >
                            <CardItem card={item} />
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item.id.toString()}
                ListHeaderComponent={renderHeader}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={{ color: "white", fontWeight: "bold", padding: 8, fontSize: 18 }}>
                        {title}
                    </Text>
                )}
                sections={sectionData}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            />
        </>
    );
};

export default SelectCard;
