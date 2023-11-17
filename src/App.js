// src/App.js
import React, { useState, useEffect } from 'react';
import HomePage from './homePage'; // 引入HomePage组件
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [weapons, setWeapons] = useState([]);
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [skins, setSkins] = useState({});
  const [paints, setPaints] = useState({});
  const [selectedSkin, setSelectedSkin] = useState(null); // 添加这行代码
  const [wearValue, setWearValue] = useState(0); // 磨损度状态
  const [patternIndex, setPatternIndex] = useState(0); // 皮肤模板状态
  useEffect(() => {
    fetch('items_zh_hans2.json')
      .then(response => response.json())
      .then(data => {
        setWeapons(data.weapons);
        setPaints(data.paints);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleWeaponChange = (event) => {
    const weaponIndex = event.target.value;
    const weapon = weapons.find(w => w.def_index.toString() === weaponIndex);
    setSelectedWeapon(weapon);
    setSelectedSkin(null); // 重置选中的皮肤

    // 假设每个武器对象都有一个paints数组，其中包含该武器可用的皮肤def_index
    if (weapon && weapon.paints) {
      // 过滤出当前选中武器的所有皮肤信息
      const weaponSkins = Object.values(weapon.paints).map(paintIndex => {
        return paints.find(paint => paint.def_index === paintIndex);
      }).filter(paint => paint != null); // 过滤掉未找到的项

      setSkins(weaponSkins);
      setSelectedSkin(weaponSkins[0].def_index); // 设置默认选中的皮肤

    } else {
      setSelectedWeapon(null);
      setSkins([]);
    }

  };
  const handleSkinChange = (event) => {
    setSelectedSkin(event.target.value);
  };

  return (
    <div className="App">
      <div class="dark">
        <ToastContainer />

        {/* 使用HomePage组件，并传递必要的props */}
        <HomePage
          weapons={weapons}
          skins={skins}
          selectedWeapon={selectedWeapon}
          selectedSkin={selectedSkin} // 添加这行代码
          wearValue={wearValue} // 传递磨损度状态
          patternIndex={patternIndex} // 传递皮肤模板状态
          handleWeaponChange={handleWeaponChange}
          handleSkinChange={handleSkinChange}
          handleWearChange={(event) => setWearValue(event.target.value)} // 处理磨损度变化
          handlePatternChange={(event) => setPatternIndex(event.target.value)} // 处理皮肤模板变化
        />
        {/* 其他UI元素和逻辑... */}
      </div>

    </div>
  );
};

export default App;
