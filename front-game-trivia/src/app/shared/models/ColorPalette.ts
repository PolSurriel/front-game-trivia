export class ColorPalette {
    main?: string;
    detail?: string;
    detailSecondary?: string;
    font?: string;

    public static BUTTON_MAIN : ColorPalette = {main: '#FF8811', detail: '#bf660d', detailSecondary: '#bf660d',  font: '#ffffff'}; 
    public static BUTTON_ACTION : ColorPalette = {main: '#f44336', detail: '#d32f2f', detailSecondary: '#d32f2f', font: '#ffffff'}; 
    public static BUTTON_SECONDARY_ACTION : ColorPalette = {main: '#F0A7A0', detail: '#F26CA7', detailSecondary: '#F26CA7', font: '#ffffff'};
    public static BUTTON_IMPORTANT_ACTION : ColorPalette = {main: 'rgb(73,192,248)', detail: 'rgb(27,153,214)', detailSecondary: 'rgb(27,153,214)', font: '#ffffff'}; 

    public static getPalette(type: string): ColorPalette {
        switch (type) {
            case 'main':
                return ColorPalette.BUTTON_MAIN;
            case 'action':
                return ColorPalette.BUTTON_ACTION;
            case 'secondary-action':
                return ColorPalette.BUTTON_SECONDARY_ACTION;
            case 'important-action':
                return ColorPalette.BUTTON_IMPORTANT_ACTION;
            default:
                return ColorPalette.BUTTON_SECONDARY_ACTION;
        }
    }
}