import * as React from 'react';

export interface IconProps
{
	className?: string;
	style?: React.CSSProperties;
	width?: number | string;
	height?: number | string;
	color?: 'green' | 'orange' | 'gray' | 'red';
}

const Icon = (Icon: React.ReactType): React.StatelessComponent<IconProps> => (
	{ className, width, height, color, style }: IconProps
): React.ReactElement<IconProps> =>
{
	const element = <Icon />;
	const props: any = {
		className: 'icon' + (className ? ` ${className}` : '')
	};
	if (width) props.width = typeof width === 'string' ? width : `${width}px`;
	if (height) props.height = typeof height === 'string' ? height : `${height}px`;
	if (color) props.className += ` ${color}`;
	if (style) props.style = { ...props.style, ...style };
	return React.cloneElement(element, {
		...element.props,
		...props
	});
};


export const IconLogo = Icon(require('../images/icons/logo.svg'));
export const IconLogoOrange = Icon(require('../images/icons/logo-orange.svg'));
export const IconLogoWhite = Icon(require('../images/icons/logo-white.svg'));

export enum IconNames
{
	LOGO,
	LOGO_ORANGE,
	LOGO_WHITE,
}

export const renderIcon = (name: IconNames, width: string, height: string, className?: string) =>
{
	switch (name)
	{
		case (IconNames.LOGO):
			return <IconLogo className={className} width={width} height={height} />;
		case (IconNames.LOGO_ORANGE):
			return <IconLogoOrange className={className} width={width} height={height} />;
		case (IconNames.LOGO_WHITE):
			return <IconLogoWhite className={className} width={width} height={height} />;
	}
}