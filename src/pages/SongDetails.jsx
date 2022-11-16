
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetSongDetailsQuery } from "../redux/services/shazamCore";
import { useGetSongRelatedQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
    const {songid} = useParams();
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state)=>state.player);
    const {data: songData, isFetching: isFetchingSongDetails}=useGetSongDetailsQuery({songid});
    const {data, isFetching: isFetchingRelatedSongs, error} = useGetSongRelatedQuery({songid});

    const handlePauseClick = () =>{
        dispatch(playPause(false));
    };
    const handlePlayClick = () => {
        dispatch(setActiveSong({song, data, i}));
        dispatch(playPause(true));
    };
    if(isFetchingRelatedSongs||isFetchingSongDetails) return (
        <Loader title="Searching Song Details"/>
    );

    if(error){
        <Error />
    }
    return (
    <div className="flex flex-col">
        <DetailsHeader artistId="" songData={songData}/>
        <div className="mb-10">
            <h2 className="text-white text-3xl font-bold">
                Lyrics:
            </h2>
            <div className="mt-5">
                {songData?.sections[1].type=='LYRICS'?
                    songData?.sections[1].text.map((line,i)=>{
                        return(
                            <p className="text-gray-400 text-base my-1">{line}</p>
                        );
                    }):<p className="text-gray-400 text-base my-1">Sorry, no lyrics found.</p>
                }
            </div>
        </div>
        <RelatedSongs data={data} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={handlePlayClick}/>
    </div>
    );
}
export default SongDetails;
