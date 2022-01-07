import React from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'

type Props = {}
type ComponentProps = Props & {}

const Component: React.FC<ComponentProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>detail</Text>
    </View>
  )
}

const Container: React.FC<Props> = (props) => {
  return <Component {...props} />
}

export { Container as Detail }

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
