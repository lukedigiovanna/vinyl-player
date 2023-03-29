import { Album } from "../models/album.model"
import { AlbumThumbnail } from "./AlbumThumbnail"

export const AlbumAccordion = (props: {albums: Album[]}) => {
    return (
        <div>
            {
                props.albums.map((value: Album, index: number) => {
                    return (
                        <AlbumThumbnail album={value} key={index} />
                    )
                })
            }
        </div>
    )
}