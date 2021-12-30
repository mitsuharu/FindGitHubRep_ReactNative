import React from 'react'
import { StyleSheet, Text, TextStyle, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { Repository } from '@/api/github/Repository'
import { Button } from '@/components/Button'

type Props = {
  repository: Repository
  onPress: (repository: Repository) => void
}
type ComponentProps = Props & {}

const Component: React.FC<ComponentProps> = ({ repository, onPress }) => {
  const { name } = repository
  return (
    <Button style={styles.container} onPress={() => onPress(repository)}>
      <Text style={styles.text}>{name}</Text>
    </Button>
  )
}

const Container: React.FC<Props> = (props) => {
  return <Component {...props} />
}

export { Container as RepItem }

const styles = StyleSheet.create({
  container: styleType<ViewStyle>({
    width: '100%',
    minHeight: 44,
    backgroundColor: 'white',
  }),
  text: styleType<TextStyle>({
    textAlign: 'center',
  }),
})
