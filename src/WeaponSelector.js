const WeaponSelector = ({
    weapons,
    selectedWeapon,
    skins,
    selectedSkin,
    wearValue,
    patternIndex,
    handleWeaponChange,
    handleSkinChange,
    handleWearChange,
    handlePatternChange,
    finalCommand,
    copyToClipboard
}) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mb-4 w-full max-w-md">
                <label
                    htmlFor="weapon-select"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                    选择武器:
                </label>
                <select
                    id="weapon-select"
                    onChange={handleWeaponChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                    <option value="">选择一个物品</option>

                    {weapons.map((weapon) => (
                        <option key={weapon.def_index} value={weapon.def_index}>
                            {weapon.item_name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedWeapon && skins.length > 0 && (
                <div className="mb-4 w-full max-w-md">
                    <div className="mb-4 w-full max-w-md">
                        <label
                            htmlFor="skin-select"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            选择皮肤:
                        </label>
                        <select
                            id="skin-select"
                            value={selectedSkin}
                            onChange={handleSkinChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            {skins.map((skin) => (
                                <option key={skin.def_index} value={skin.def_index}>
                                    {skin.item_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-2 w-full max-w-md">
                        <label
                            htmlFor="wear-select"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            磨损度: {wearValue}
                        </label>
                        <input
                            type="range"
                            id="wear-select"
                            min="0"
                            max="1"
                            step="0.01"
                            value={wearValue}
                            onChange={handleWearChange}
                            className="mt-1 block w-full"
                        />
                    </div>
                    <div className="mb-2 w-full max-w-md">
                        <label
                            htmlFor="pattern-select"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            皮肤模板: {patternIndex}
                        </label>
                        <input
                            type="range"
                            id="pattern-select"
                            min="0"
                            max="1024"
                            value={patternIndex}
                            onChange={handlePatternChange}
                            className="mt-1 block w-full py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                </div>
            )}
            {selectedSkin && (
                <div className="mb-2 w-full max-w-md">
                    <img
                        src={"https://steammedia.moeub.cn/apps/730/icons/econ/" + selectedWeapon.skins[selectedSkin]}
                        alt="预览"
                        className="w-full h-auto" // 根据需要调整样式
                    />
                </div>
            )}

            {finalCommand && (
                <div className="my-4 p-4 rounded mx-auto max-w-lg flex flex-col items-center  shadow-lg">
                    <span className="text-sm text-gray-500 dark:text-gray-300">生成的指令,请输入到聊天框里面:</span>
                    <div className="flex items-center w-full mt-2 bg-gray-100 dark:bg-gray-600 p-2 rounded">
                        <code className="flex-grow text-blue-500 dark:text-blue-400 overflow-x-auto">{finalCommand}</code>
                        <button onClick={copyToClipboard} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded transition duration-200 ease-in-out hover:bg-blue-600 focus:outline-none">
                            复制命令
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeaponSelector;
