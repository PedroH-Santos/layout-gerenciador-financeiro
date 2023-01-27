
import { DefaultLabel } from '@/css/default';
import {Root,Item,Indicator}  from '@radix-ui/react-radio-group';
import { BoxOptions, Icon, Line, RadixIndicator, RadixItem, TypesOptions } from './styles';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


export default function RadixRadio(){

    const [value, setValue] = useState(TypesOptions.WITHDRAW.toString());
    return (
        <Root value={value} onValueChange={setValue} defaultValue={value}>
            <BoxOptions>
                <div> 
                    <RadixItem value='Deposit' checked={value == TypesOptions.DEPOSIT.toString()} >
                        <RadixIndicator/> 
                            <Icon  typeoption={TypesOptions.DEPOSIT} icon={faCirclePlus}/> 
                            <DefaultLabel>
                                Deposito
                            </DefaultLabel>
                    </RadixItem>

                </div>  
                <Line/>
                <div>

                    <RadixItem value='Withdraw' checked={value == TypesOptions.WITHDRAW.toString()} >
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