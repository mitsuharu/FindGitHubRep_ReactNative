// eslint-disable-next-line max-classes-per-file
import {
  CacheKey,
  Deserializer,
  JsonProperty,
  ObjectMapper,
} from 'json-object-mapper'
import { User } from './User'

@CacheKey('Repository#User')
class UserDeserializer implements Deserializer {
  // eslint-disable-next-line class-methods-use-this
  deserialize = (value: string): User => ObjectMapper.deserialize(User, value)
}

export class Repository {
  @JsonProperty()
  id: number

  @JsonProperty()
  name: string

  @JsonProperty({ name: 'full_name' })
  fullName: string

  @JsonProperty({ name: 'html_url' })
  url: string

  @JsonProperty({ required: false })
  description?: string

  @JsonProperty({ deserializer: UserDeserializer })
  owner: User

  @JsonProperty({ name: 'stargazers_count' })
  stars: number

  @JsonProperty({ name: 'watchers_count' })
  watchers: number

  @JsonProperty()
  topics: string[]
}
