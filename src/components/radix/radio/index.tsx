
import { DefaultLabel } from '@/css/default';
import {Root,Item,Indicator}  from '@radix-ui/react-radio-group';
import { BoxOptions, Icon, Line, RadixIndicator, RadixItem, TypesOptions } from './styles';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


type RadixRadioProps = {
    onValueChange: (value: string) => void;
    value: string;

}

export default function RadixRadio({ value, onValueChange}: RadixRadioProps){

    return (
        <Root value={value} onValueChange={onValueChange} defaultValue={value}>
            <BoxOptions>
                <div> 
                    <RadixItem value='DEPOSIT' checked={value == TypesOptions.DEPOSIT.toString()} >
                        <RadixIndicator/> 
                            <Icon  typeoption={TypesOptions.DEPOSIT} icon={faCirclePlus}/> 
                            <DefaultLabel>
                                Deposito
                            </DefaultLabel>
                    </RadixItem>

                </div>  
                <Line/>
                <div>

                    <RadixItem value='WITHDRAW' checked={value == TypesOptions.WITHDRAW.toString()} >
                        <RadixIndicator /> 
                        <Icon  typeoption={TypesOptions.WITHDRAW} icon={faCirclePlus} /> 
                            <DefaultLabel>
                                Retirada
                            </DefaultLabel>
                    </RadixItem>
    
                </div> 
            </BoxOptions>
        </Root>
    )

}