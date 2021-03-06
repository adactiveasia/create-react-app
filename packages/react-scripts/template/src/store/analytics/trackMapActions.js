// @flow

import { WayfindingActions, SelectionActions } from '@adactive/arc-map';
import { DefaultSchemaHelper, Tracker } from '@adactive/adsum-client-analytics';
import { ClientAPI as ACA } from '@adactive/adsum-utils';

const trackMapActions = (tracker: Tracker, store: *, action: *) => {
    switch (action.type) {
    case WayfindingActions.types.WILL_DRAW_TO_POI: {
        const poi = ACA.getPoi(action.poiId);
        if (poi !== null) {
            tracker.add(
                DefaultSchemaHelper.getPoiType(),
                DefaultSchemaHelper.getPoiEvent(
                    'goTo',
                    poi,
                ),
            );
        }
        break;
    }
    case WayfindingActions.types.WILL_DRAW_TO_PLACE: {
        const place = ACA.getPlace(action.placeId);
        if (place !== null) {
            tracker.add(
                DefaultSchemaHelper.getPlaceType(),
                DefaultSchemaHelper.getPlaceEvent(
                    'goTo',
                    place,
                ),
            );
        }
        break;
    }
    case SelectionActions.types.WILL_SELECT: {
        const { adsumObject } = action;
        if (adsumObject && adsumObject.placeId) {
            const place = ACA.getPlace(adsumObject.placeId);
            if (place !== null) {
                tracker.add(
                    DefaultSchemaHelper.getPlaceType(),
                    DefaultSchemaHelper.getPlaceEvent(
                        'select',
                        place,
                    ),
                );
            }
        }
        break;
    }
    default:
    }
};

export default trackMapActions;
