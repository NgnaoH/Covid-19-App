import {feature} from 'topojson-client';

import countries from '../assets/map.json';

export const COUNTRIES = feature(countries, countries.objects.countries).features