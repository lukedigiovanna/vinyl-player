import styled from 'styled-components';
import { Album } from '../models/album.model';

const Thumbnail = styled.img`
    width: 80px;
    height: 80px;

    filter: brightness(1.0);

    transition: filter 0.6s ease-in-out;

    &:hover {
        filter: brightness(0.9);
    }
`

export const AlbumThumbnail = (props: {album: Album}) => {
    return (
        <Thumbnail src={props.album.coverSrc} />
    )
};