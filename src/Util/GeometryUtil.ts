/* Released under the BSD 2-Clause License
 *
 * Copyright © 2018-present, terrestris GmbH & Co. KG and GeoStyler contributors
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import { Style } from 'geostyler-style';
import OlGeomPoint from 'ol/geom/Point';
import OlGeomLineString from 'ol/geom/LineString';
import OlGeomPolygon from 'ol/geom/Polygon';
import { ProjectionLike } from 'ol/proj';

/**
 * @class GeometryUtil
 */
class GeometryUtil {

  static getSampleGeomFromStyle = (style: Style, projection: ProjectionLike) => {
    const kinds: string[] = [];
    style.rules.forEach(rule => {
      rule.symbolizers.forEach(symbolizer => {
        if (!kinds.includes(symbolizer.kind)) {
          kinds.push(symbolizer.kind);
        }
      });
    });
    return kinds.map(kind => {
      switch (kind) {
        case 'Mark':
        case 'Icon':
        case 'Text':
          return (new OlGeomPoint([7.10066, 50.735851]))
            .transform('EPSG:4326', projection);
        case 'Fill':
          return (new OlGeomPolygon([[
            [7.1031761169433585, 50.734268655851345],
            [7.109270095825195, 50.734268655851345],
            [7.109270095825195, 50.73824770380063],
            [7.1031761169433585, 50.73824770380063],
            [7.1031761169433585, 50.734268655851345]
          ]]))
            .transform('EPSG:4326', projection);
        case 'Line':
          return (new OlGeomLineString([
            [7.062578201293945, 50.721786104206004],
            [7.077512741088867, 50.729610159968296],
            [7.082319259643555, 50.732435192351126],
            [7.097940444946289, 50.73748722929948],
            [7.106866836547852, 50.73775882875318],
            [7.117509841918945, 50.73889952925885],
            [7.129182815551758, 50.7504679214779]
          ]))
            .transform('EPSG:4326', projection);
        default:
          return (new OlGeomPoint([7.10066, 50.735851]))
            .transform('EPSG:4326', projection);
      }
    });
  };
}

export default GeometryUtil;
