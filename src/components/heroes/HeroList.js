import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {

    // Solamente se actualizan los heroes si el publisher cambia
    const heroes = useMemo(() => getHeroesByPublisher(publisher) , [publisher]);

    return (
        <div className="row  row-cols-md-3 g-4 animate__animated animate__fadeIn">
            {
                heroes.map(hero => (
                    <HeroCard key={ hero.id } {...hero} />
                ))
            }
        </div>
    )
}
