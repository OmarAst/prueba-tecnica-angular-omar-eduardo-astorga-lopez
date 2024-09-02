
import { ISerializer } from './../ISerializer';

export interface IGamesDetails {
    id: number,
    title: string,
    thumbnail: string,
    status: string,
    short_description: string,
    description: string,
    game_url: string,
    genre: string,
    platform: string,
    publisher: string,
    developer: string,
    release_date: string,
    freetogame_profile_url: string,
    minimum_system_requirements: requisitos,
    screenshots: screenshots[]
}

export interface requisitos {
    os: string,
    processor: string,
    memory: string,
    graphics: string,
    storage: string,
}

export interface screenshots {
    id: number
    image: string
}

export class IGamesDetailsSerializer implements ISerializer<IGamesDetails> {


    fromJson(json: any): IGamesDetails {
        return Object.assign({}, json,
            {
                id: parseInt(json.id, 10),
                title: json.title.toString().trim(),
                thumbnail: json.thumbnail.toString().trim(),
                status: json.status.toString().trim(),
                short_description: json.short_description.toString().trim(),
                description: json.description.toString().trim(),
                game_url: json.game_url.toString().trim(),
                genre: json.genre.toString().trim(),
                platform: json.platform.toString().trim(),
                publisher: json.publisher.toString().trim(),
                developer: json.developer.toString().trim(),
                release_date: json.release_date.toString().trim(),
                freetogame_profile_url: json.freetogame_profile_url.toString().trim(),
                minimum_system_requirements: json.minimum_system_requirements,
                screenshots: json.screenshots,

            });
    }

    toJson(item: IGamesDetails): any {
        return {
            id: item.id,
            title: item.title,
            thumbnail: item.thumbnail,
            status: item.status,
            short_description: item.short_description,
            description: item.description,
            game_url: item.game_url,
            genre: item.genre,
            platform: item.platform,
            publisher: item.publisher,
            developer: item.developer,
            release_date: item.release_date,
            freetogame_profile_url: item.freetogame_profile_url,
            minimum_system_requirements: item.minimum_system_requirements,
            screenshots: item.screenshots,
        };

    }
}
