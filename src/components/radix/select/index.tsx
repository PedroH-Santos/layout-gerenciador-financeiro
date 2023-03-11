
import { DefaultIcon, DefaultLabel } from '@/css/default';
import { Root, Trigger, Value, Icon, Portal, Item, ItemText, ItemIndicator, ScrollDownButton, Arrow, Content, ScrollUpButton, Viewport, Group, Label, SelectItem, Separator } from '@radix-ui/react-select';
import { Ref, forwardRef, useState } from 'react';
import { IconFontAwesome, ItemRadix, TriggerRadix, ViewPortRadix } from './styles';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { RadixOptionProps } from '@/@types/RadixOptionProps';
import { UseFormRegister } from 'react-hook-form';


type RadixSelectProps = {
    name: string;
    options: RadixOptionProps[];
    onValueChange: (value: string) => void;
    value: string;
    fncRef: Ref<HTMLButtonElement> | undefined;
} 



export default function RadixSelect({ name, options, onValueChange, value , fncRef}: RadixSelectProps) {

    function change(value: string) {
        onValueChange(value);
    }
    return (
        <Root value={value} onValueChange={change} >
            <DefaultLabel> {name} </DefaultLabel>
            <TriggerRadix ref={fncRef}  >
                <Value aria-label={value} > 
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