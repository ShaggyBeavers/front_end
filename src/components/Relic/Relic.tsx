import React, { useEffect, useState } from 'react';
import axios from 'axios';
import agent from '../../app/api/agent';
import NotFound from '../NotFound/not_found';
import './relic.css'
import { useNavigate } from 'react-router-dom';

interface RelicProps {
    relicId: number;
}

interface RelicPropertyDTO {
    name: string;
    value: string;
}

interface RelicInfoDTO {
    techniqueName: string;
    historicalPeriodName: string;
    dimensions: string;
    marks: string;
    labels: string;
    signatures: string;
    restoration: string;
    annotation: string;
}

interface RecoveredRelicInfoDTO {
    locationSource: string;
    returnProcess: string;
    returnDate: string;
    courtDecision: string;
}

interface LostRelicInfoDTO {
    lossWay: string;
    lossTime: string;
    museumName: string;
    probableLocation: string;
}

interface Relic {
    id: number;
    name: string;
    creationDate: string;
    creationPlaceName: string;
    imageUrl: string;
    museumName: string;
    regionName: string;
    quantity: number;
    collection: string;
    comment: string;
    status: string;
    relicPropertyDTOs: RelicPropertyDTO[];
    relicInfoDTO: RelicInfoDTO;
    recoveredRelicInfoDTO: RecoveredRelicInfoDTO;
    lostRelicInfoDTO: LostRelicInfoDTO;
}


const Relic = ({ relicId }: RelicProps) => {
    const [item, setItem] = useState<Relic | null>(null);

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await agent.Relic.fetchDetails(relicId);
                console.log('Request Details:', response.config);
                setItem(response.data);
                console.log(item);
            } catch (error) {
                console.error('Error fetching item details:', error);
            }
        };
        fetchItemDetails();
    }, [relicId]);

    // if (!item) {
    //     return <NotFound/>;
    // }
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); 
    };
    return (
        <div className='relic_con'>
            <div className='relic_left'>
                <div className='prev_relic' onClick={goBack}>
                    <img src="/icons/prev_arrow.svg" alt="" style={{height: 14}}/>
                    <p>Повернутись</p>
                </div>
                <h4>Мозаїчне зображення Димитрія Солунського з Михайлівського Золотоверхого собору</h4>
            </div>
            <div className='relic_right'>
                <h2>pic</h2>
            </div>
        </div>
    );
};

export default Relic;
