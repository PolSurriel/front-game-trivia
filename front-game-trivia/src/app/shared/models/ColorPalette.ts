export class ColorPalette {
    main?: string;
    detail?: string;
    detailSecondary?: string;
    font?: string;

    public static BUTTON_MAIN : ColorPalette = {main: '#f44336', detail: '#d32f2f', detailSecondary: '#d32f2f',  font: '#ffffff'}; 
    public static BUTTON_ACTION : ColorPalette = {main: '#f44336', detail: '#d32f2f', detailSecondary: '#d32f2f', font: '#ffffff'}; 
    public static BUTTON_SECONDARY_ACTION : ColorPalette = {main: 'blue', detail: '#d32f2f', detailSecondary: '#d32f2f', font: '#ffffff'};

    public static getPalette(type: string): ColorPalette {
        switch (type) {
            case 'main':
                return ColorPalette.BUTTON_MAIN;
            case 'action':
                return ColorPalette.BUTTON_ACTION;
            case 'secondary-action':
                return ColorPalette.BUTTON_SECONDARY_ACTION;
            default:
                return ColorPalette.BUTTON_SECONDARY_ACTION;
        }
    }
}