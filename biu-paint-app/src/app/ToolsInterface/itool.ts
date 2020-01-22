import { Point } from '../model/point';
import { ShapeBoundingBox } from '../model/shapeboundingbox';

export interface ITool {
    draw(ctx: CanvasRenderingContext2D, mouseLocation?: Point, mouseClicked?: Point, shapeBoundingBox?: ShapeBoundingBox);
}
