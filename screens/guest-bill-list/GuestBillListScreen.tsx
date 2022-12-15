import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import { TabController, View } from 'react-native-ui-lib';

import { TERRA_COLOR } from '../../constants/theme';
import BillCard from '../../components/BillCard/BillCard';
import { ScrollView } from 'react-native-gesture-handler';

export default function GuestBillListScreen() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const setIndexDebounce = debounce((value) => {
    setSelectedIndex(value);
  }, 500);

  const onChangeDebounce = useCallback((value: number) => setIndexDebounce(value), []);

  return (
    <TabController
      items={[
        { label: 'Tất cả' },
        { label: 'Chưa thanh toán' },
        { label: 'Đã thanh toán' },
        { label: 'Quá hạn' },
      ]}
      initialIndex={selectedIndex}
      onChangeIndex={onChangeDebounce}
    >
      <TabController.TabBar
        enableShadows
        activeBackgroundColor={TERRA_COLOR.PRIMARY[0]}
        selectedLabelColor={TERRA_COLOR.PRIMARY[3]}
        uppercase
      />
      <View flex style={{ backgroundColor: TERRA_COLOR.PRIMARY[1] }}>
        <TabController.TabPage index={0}>{renderFirstPage()}</TabController.TabPage>
        <TabController.TabPage index={1}>
          {/* {renderPage(selectedDate, setSelectedDate)} */}
        </TabController.TabPage>
        <TabController.TabPage index={2}>
          {/* {renderPage(selectedDate, setSelectedDate)} */}
        </TabController.TabPage>
        <TabController.TabPage index={3}>
          {/* {renderPage(selectedDate, setSelectedDate)} */}
        </TabController.TabPage>
      </View>
    </TabController>
  );
}

const mockData = [
  {
    time: new Date(),
    money: 20000000,
    status: 1,
  },
  {
    time: new Date(),
    money: 20000000,
    status: 2,
  },
  {
    time: new Date(),
    money: 20000000,
    status: 0,
  },
];

const renderFirstPage = () => {
  return (
    <ScrollView>
      {mockData.map((item) => (
        <BillCard {...item} />
      ))}
    </ScrollView>
  );
};
