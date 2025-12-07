import '../../styles/index.css'
import '../../styles/Header.css'
import '../../styles/SelectOptions.css'
import SelectLevel from './SelectLevel';
export function SelectOptions() {
  const schoolOptions = [
    {
      id: 0,
      option: '7eme'
    },

    {
      id: 1,
      option: '8eme'
    },
    {
      id: 2,
      option: '9eme'
    },
    {
      id: 3,
      option: '1ere'
    },
    {
      id: 4,
      option: '2eme'
    },
    {
      id: 5,
      option: '3eme'
    },
    {
      id: 6,
      option: 'Bac'
    }
  ];
  const language = [
    {
      id: 7,
      option: 'Tunisian'
    },
    {
      id: 8,
      option: 'Arabic'
    },
    {
      id: 9,
      option: 'English'
    },
    {
      id:10,
      option: 'French'
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

      <SelectLevel  schoolOptions={schoolOptions} placeHolder={'SelectLevel'} storageKey={'level'}/>
      <SelectLevel  schoolOptions={language} placeHolder={'Select Language'} storageKey={'language'} />
      <SelectLevel  schoolOptions={agentType} placeHolder={'Fast'} storageKey={'agenttype'} />
    </div>

  )
}