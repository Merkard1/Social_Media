import { Currency } from "5_entities/Currency";
import { Country } from "5_entities/Country";
import { Age } from "5_entities/Age";

export interface Profile {
    id?: string;
    name?: string;
    lastname?: string;
    age?: Age,
    currency?: Currency,
    country?: Country;
    city?: string,
    username?: string;
    avatar?: string;
}
