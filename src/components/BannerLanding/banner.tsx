import { useQuery } from '@tanstack/react-query';
import './banner.css';
import RelicAPI from '../../app/api/Relic/relic';
import { RelicStatusEnum } from '../../../src/enums/relicstatus';

const BannerLanding = () => {
    const countRelicsByStolen = useQuery({
        queryKey: ['countRelicsByStatus'],
        queryFn: async () =>
            await RelicAPI.countRelicsByStatuses([RelicStatusEnum.STOLEN]),
    });
    const countRelicsByDestroyed = useQuery({
        queryKey: ['countRelicsByStatus'],
        queryFn: async () =>
            await RelicAPI.countRelicsByStatuses([RelicStatusEnum.DESTROYED]),
    });
    const countRelicsByReturned = useQuery({
        queryKey: ['countRelicsByStatus'],
        queryFn: async () =>
            await RelicAPI.countRelicsByStatuses([RelicStatusEnum.RETURNED]),
    });
    if (
        countRelicsByStolen.isLoading ||
        countRelicsByDestroyed.isLoading ||
        countRelicsByReturned.isLoading
    ) {
        return <div>Loading...</div>;
    }
    if (
        countRelicsByStolen.isError ||
        countRelicsByDestroyed.isError ||
        countRelicsByReturned.isError
    ) {
        return <div>Error...</div>;
    }
    let stolen = countRelicsByStolen.data;
    let destroyed = countRelicsByDestroyed.data;
    let returned = countRelicsByReturned.data;
    return (
        <div>
            <div className="banner_landing">
                <div className="ban_lan_con w-full">
                    <div className="mb-5 justify-items-center">
                        <h1>Реліквій було вкрадено:</h1>
                        {/* temporarily hardcoded */}
                        <span>{stolen}</span>
                    </div>
                    <div className="flex row justify-around">
                        <div className="">
                            <h2 className="">Знищено:</h2>
                            <p className="text-[4.2rem]">{destroyed}</p>
                        </div>
                        <div>
                            <h2 className="">Повернуто:</h2>
                            <p className="text-[4.2rem]">{returned}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerLanding;
