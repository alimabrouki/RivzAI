import '../../styles/index.css'
import '../../styles/header/Header.css'
import '../../styles/home-page/SelectOptions.css'
import {SelectLevel} from './SelectLevel';
export const SelectOptions = () => {
  const schoolOptions = [
    {
      id: 0,
      option: 'Bac Science'
    },

    {
      id: 1,
      option: 'Bac Math'
    }
  ];
  const agentType = [
    {
      id: 11,
      option: 'Fast'
    },
    {
      id: 12,
      option: 'Thinker'
    }
  ];
 
  return (
    <div className="select-wrapper">
      <SelectLevel  schoolOptions={schoolOptions} placeHolder={'Level'} storageKey={'level'}/>
      <SelectLevel  schoolOptions={agentType} placeHolder={'Fast'} storageKey={'agenttype'} />
    </div>

  )
}