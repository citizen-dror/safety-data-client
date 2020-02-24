import React , {MouseEvent} from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { observer } from "mobx-react"
import { useStore } from '../stores/storeConfig'

export const LanguageSelector = observer(() => {
  const store = useStore();
  const style:any = document.getElementById('style-direction')
  if (style !== null)
  {
    if(store.language === 'he') {
        style.href = './bootstrap.rtl.min.css';
        //changeLanguage('he')
        document.body.classList.remove('dir-ltr');
        document.body.classList.add('dir-rtl');
    } 
    else {
        style.href = './bootstrap.min.css';
        //changeLanguage('en')
        document.body.classList.remove('dir-rtl');
        document.body.classList.add('dir-ltr');
    }
  }
  return (
    <div>
    <ButtonGroup toggle size="sm" className="languageSelector">
    <ToggleButton type="radio" name="radiolang"  value="he" defaultChecked onClick={(e:MouseEvent) => { store.updateLanguage('he'); }}>
      heb
    </ToggleButton>
    <ToggleButton type="radio" name="radiolang" value="en" onClick={(e:MouseEvent) => { store.updateLanguage('en'); }}>
      Eng
    </ToggleButton>
  </ButtonGroup>
  </div>
  );
})

