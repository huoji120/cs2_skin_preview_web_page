// src/HomePage.js
import React, { useState, useEffect } from 'react';
import WeaponSelector from './WeaponSelector';
import { toast } from 'react-toastify';

const HomePage = ({ weapons, skins, selectedWeapon, selectedSkin, wearValue, patternIndex, handleWeaponChange, handleSkinChange, handleWearChange, handlePatternChange }) => {
    const [selectedType, setSelectedType] = useState('weapon'); // 默认选择'weapon'

    const [guns, setGuns] = useState([]); // 存储枪的列表
    const [knives, setKnives] = useState([]); // 存储刀的列表
    const [finalCommand, setFinalCommand] = useState(''); // 添加这行代码

    useEffect(() => {
        // 在组件加载时进行枪和刀的分类
        const gunsList = weapons.filter(weapon => weapon.def_index < 500);
        const knivesList = weapons.filter(weapon => weapon.def_index >= 500);
        setGuns(gunsList);
        setKnives(knivesList);
    }, [weapons]); // 当weapons更新时重新计算

    useEffect(() => {
        console.log(selectedWeapon, selectedSkin);
        if (selectedWeapon && selectedSkin) {
            const fullString = selectedWeapon.class_name;
            const parts = fullString.split("_");
            const desiredPart = selectedType === 'weapon' ? parts[1] : selectedWeapon.def_index; // 这将会是 "xxxx"
            const weaponName = desiredPart;
            const skinName = selectedSkin;
            const wear = wearValue;
            const pattern = patternIndex;
            const command = ` ${weaponName} ${skinName} ${pattern} ${wear}`
            const prefix = selectedType === 'weapon' ? '.ws' : '.knife';
            setFinalCommand(prefix + command);
        }
    }, [selectedWeapon, selectedSkin, wearValue, patternIndex, skins]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(finalCommand).then(() => {
            // 显示成功通知
            toast.success('命令已复制到剪贴板！');
        }).catch(() => {
            // 显示错误通知
            toast.error('复制失败，请手动复制！');
        });
    };

    const toggleType = () => {
        setSelectedType(selectedType === 'weapon' ? 'knife' : 'weapon');
        handleWeaponChange({ target: { value: '' } }); // 重置选中的武器和皮肤
        setFinalCommand('');

    };

    // 根据选中状态和暗色模式设置按钮样式
    const getButtonClass = (type) => {
        let baseClass = "px-4 py-2 focus:outline-none transition-colors duration-300";
        if (selectedType === type) {
            return `${baseClass} bg-blue-600 text-white dark:bg-blue-500`;
        }
        return `${baseClass} bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300`;
    };

    return (
        <div className="dark:bg-gray-800 dark:text-white min-h-screen">
            <nav className="bg-gray-900 p-4 text-white">
                <ul className="flex space-x-4">
                    TG社区皮肤选择器
                </ul>
            </nav>

            <main className="p-4">
                <div className="flex justify-center mb-4">
                    <button
                        className={`${getButtonClass('weapon')} rounded-l-lg`}
                        onClick={toggleType}
                    >
                        武器
                    </button>
                    <button
                        className={`${getButtonClass('knife')} rounded-r-lg`}
                        onClick={toggleType}
                    >
                        刀
                    </button>
                </div>
                <WeaponSelector
                    weapons={selectedType === 'weapon' ? guns : knives} // 根据选中类型传递枪或刀的列表
                    skins={skins}
                    selectedWeapon={selectedWeapon}
                    selectedSkin={selectedSkin} // 添加这行代码
                    wearValue={wearValue} // 添加这行代码
                    patternIndex={patternIndex} // 添加这行代码
                    handleWeaponChange={handleWeaponChange}
                    handleSkinChange={handleSkinChange}
                    handleWearChange={handleWearChange}
                    handlePatternChange={handlePatternChange}
                    finalCommand={finalCommand} // 添加这行代码
                    copyToClipboard={copyToClipboard} // 添加这行代码
                />
            </main>
        </div>
    );
};

export default HomePage;
