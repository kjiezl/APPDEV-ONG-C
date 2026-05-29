import React, { useEffect, useRef } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/reducers';
import { markNotificationRead } from '../app/actions/notificationActions';

const InAppBanner: React.FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notifications.items);
  const translateY = useRef(new Animated.Value(-120)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const latest = notifications.find(n => !n.read);

  useEffect(() => {
    if (!latest) return;

    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();

    timerRef.current = setTimeout(() => dismiss(latest.id), 4000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [latest?.id]);

  function dismiss(id: string) {
    Animated.timing(translateY, {
      toValue: -120,
      duration: 250,
      useNativeDriver: true,
    }).start(() => dispatch(markNotificationRead(id)));
  }

  if (!latest) return null;

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        paddingHorizontal: 16,
        paddingTop: 32,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => dismiss(latest.id)}
        className="bg-white rounded-2xl px-4 py-3 shadow-lg flex-row items-start"
        style={{ gap: 12 }}
      >
        <Text style={{ fontSize: 20 }}>🔔</Text>
        {latest.status ? (
            <View style={{ flex: 1 }}>
            <Text className="text-space-cadet font-bold text-sm">{latest.title ?? ''}</Text>
            <Text className="text-gray-600 text-xs" style={{ marginTop: 2 }}>{latest.body ?? ''}</Text>
            </View>
        ) : null}
        <Text className="text-gray-600 text-xs">✕</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default InAppBanner;