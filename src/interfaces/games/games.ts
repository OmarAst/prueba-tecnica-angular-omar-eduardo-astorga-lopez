
import { ISerializer } from './../ISerializer';

export interface IGames {
    id: 582,
    title: string,
    thumbnail: string,
    short_description: string,
    game_url: string,
    genre: string,
    platform: string,
    publisher: string,
    developer: string,
    release_date: string,
    freetogame_profile_url: string
}

export class IGamesSerializer implements ISerializer<IGames> {

    fromJson(json: any): IGames {
        return Object.assign({}, json,
            {
                id: parseInt(json.id, 10),
                title: json.title.toString().trim(),
                thumbnail: json.thumbnail.toString().trim(),
                short_description: json.short_description.toString().trim(),
                game_url: json.game_url.toString().trim(),
                genre: json.genre.toString().trim(),
                platform: json.platform.toString().trim(),
                publisher: json.publisher.toString().trim(),
                developer: json.developer.toString().trim(),
                release_date: json.release_date.toString().trim(),
                freetogame_profile_url: json.freetogame_profile_url.toString().trim()
            });
    }

    toJson(item: IGames): any {
        return {
            id: item.id,
            title: item.title,
            thumbnail: item.thumbnail,
            short_description: item.short_description,
            game_url: item.game_url,
            genre: item.genre,
            platform: item.platform,
            publisher: item.publisher,
            developer: item.developer,
            release_date: item.release_date,
            freetogame_profile_url: item.freetogame_profile_url,
        };

    }
}
