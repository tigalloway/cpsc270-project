import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HikeFilter from './assets/dropDown';
import HikeBox from './HikeBox';

interface Hike {
    id: number;
    name: string;
    difficulty: string;
    image_url: string;
    distance: string;
    location_url: string;
    description: string;
  }

type Props = {
    hikesData: Hike[];
    hikeDifficulty: number | null;
    setHikeDifficulty: (val: number) => void;
    setSelectedHike: (hike: Hike) => void;
    savedHikeIds: Set<number>;
    completedHikes: Set<number>;
  
};

const FilterDiv: React.FC<Props> = ({
    hikesData,
    hikeDifficulty,
    setHikeDifficulty,
    setSelectedHike,
    savedHikeIds,
    completedHikes,
    }) => {
    const filteredHikes = [...hikesData]
        .filter((hike) => {
        if (hikeDifficulty === 0) return true;
        const difficultyMap: { [key: string]: number } = {
            Beginner: 1,
            Intermediate: 2,
            Advanced: 3,
            };
            return difficultyMap[hike.difficulty] === hikeDifficulty;
            })
            .sort((a, b) => Number(a.distance) - Number(b.distance));

    return (
        <>
        <Text>Show hikes by difficulty:</Text>
        <HikeFilter selected={hikeDifficulty} onChange={setHikeDifficulty} />
        <View style={styles.hikeGrid}>
            {filteredHikes.map((hike) => (
            <HikeBox
                key={hike.id}
                hike={hike}
                onSelect={setSelectedHike}
                isSaved={savedHikeIds.has(hike.id)}
                isCompleted={completedHikes.has(hike.id)}
            />
            ))}
        </View>
        </>
    );
    };

const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    hikeGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },})

    export default FilterDiv;    