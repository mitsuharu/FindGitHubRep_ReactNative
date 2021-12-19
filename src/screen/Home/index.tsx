import React, { useCallback } from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { useNavigation } from '@react-navigation/native'
import { MainName } from '@/routes/main.constraint'

type Props = {}
type ComponentProps = Props & {
  onPress: () => void
}

const Component: React.FC<ComponentProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} onPress={onPress}>
        home
      </Text>
    </View>
  )
}

const Container: React.FC<Props> = (props) => {
  const navigation = useNavigation()
  const onPress = useCallback(() => {
    navigation.navigate(MainName.Detail)
  }, [navigation])

  return <Component {...props} onPress={onPress} />
}

export { Container as Home }

const styles = StyleSheet.create({
  container: styleType<ViewStyle>({
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  text: styleType<TextStyle>({
    textAlign: 'center',
  }),
})
