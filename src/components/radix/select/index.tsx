
import { DefaultIcon, DefaultLabel } from '@/css/default';
import { Root, Trigger, Value, Icon, Portal, Item, ItemText, ItemIndicator, ScrollDownButton, Arrow, Content, ScrollUpButton, Viewport, Group, Label, SelectItem, Separator } from '@radix-ui/react-select';
import { useState } from 'react';
import { IconFontAwesome, ItemRadix, TriggerRadix, ViewPortRadix } from './styles';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { RadixOptionProps } from '@/@types/RadixOptionProps';


type RadixSelectProps = {
    name: string;
    options: RadixOptionProps[];
}



export default function RadixSelect({ name, options }: RadixSelectProps) {
    const [value, setValue] = useState('Nenhum');

    return (
        <Root value={value} onValueChange={setValue}>
            <DefaultLabel> {name} </DefaultLabel>
            <TriggerRadix>
                <Value aria-label={value}>
                    {value}
                </Value>
                <Icon>
                    <IconFontAwesome icon={faChevronDown} />
                </Icon>
            </TriggerRadix>

            <Portal>
                <Content>
                    <ViewPortRadix>
                        {options.map((option) => {
                            return (
                                <ItemRadix value={option.value} key={option.value}>
                                    <ItemText> {option.text} </ItemText>
                                </ItemRadix>
                            )
                        })}
                    </ViewPortRadix>
                </Content>
            </Portal>
        </Root>
    )

}