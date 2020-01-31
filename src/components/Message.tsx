import * as React from "react";
import { FormattedMessage } from "react-intl";
export default function Message(
	id: string,
	defaultMessage?: string
)
{
	return (
		<FormattedMessage
			id={id}
			defaultMessage={defaultMessage ? defaultMessage : id}
		/>
	);
}
