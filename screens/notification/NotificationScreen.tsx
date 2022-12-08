import React, { useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { View, TextField, Text, Button, TabController } from 'react-native-ui-lib';
import NotificationCard from '../../components/NotiCard/NotiCard';
import { TERRA_COLOR } from '../../constants/theme/color';

function NotificationComponents() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <TabController
      items={[{ label: 'Từ ban quản lý' }, { label: 'Từ hệ thống' }]}
      initialIndex={selectedIndex}
      onChangeIndex={(index: number) => setSelectedIndex(index)}
    >
      <TabController.TabBar
        enableShadows
        activeBackgroundColor={TERRA_COLOR.PRIMARY[0]}
        selectedLabelColor={TERRA_COLOR.PRIMARY[3]}
        uppercase
      />
      <View flex>
        <TabController.TabPage index={0}>{renderFirstPage()}</TabController.TabPage>
        <TabController.TabPage index={1}>{renderFirstPage()}</TabController.TabPage>
      </View>
    </TabController>
  );
}

const renderFirstPage = () => {
  return (
    <View style={{ alignItems: 'center', marginTop: '5%' }}>
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={() => <NotificationCard />}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const NotificationScreen = gestureHandlerRootHOC(NotificationComponents);

export default NotificationScreen;
