import { JsonProperty } from 'json-object-mapper'

export class User {
  @JsonProperty()
  id: number

  @JsonProperty({ name: 'login' })
  name: string

  @JsonProperty({ name: 'avatar_url' })
  avatarUrl: string

  @JsonProperty({ name: 'html_url' })
  url: string
}
