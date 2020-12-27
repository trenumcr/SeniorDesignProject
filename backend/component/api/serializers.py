from rest_framework import serializers
from component.models import Component #, Comment, Specification



# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = ['id','comment', 'who', 'created', 'up_vote', 'down_vote']
#
# class SpecificationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Specification
#         fields = ['key']

class JSONSerializerField(serializers.Field):
    """ Serializer for JSONField -- required to make field writable"""
    def to_internal_value(self, data):
        return data
    def to_representation(self, value):
        return value

class ComponentSerializer(serializers.ModelSerializer):
    comments = JSONSerializerField(allow_null=True, required=False)
    specifications = JSONSerializerField(allow_null=True, required=False)
    class Meta:
        model = Component
        fields = '__all__'

    def create(self, validated_data):
        # comment_data = validated_data.pop('comments')
        # component = Component.objects.create(**validated_data)
        # for comment_data in comment_data:
        #     Comment.objects.create(component=component, **comment_data)
        return component

    #
    # def update(self, instance, validated_data):
    #     comment_data = validated_data.pop('comment')
    #     comments = (instance.comment).all()
    #     comments = list(comments)
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.picture = validated_data.get('picture', instance.picture)
    #     instance.category = validated_data.get('category', instance.category)
    #     instance.manufacture_name = validated_data.get('name', instance.name)
    #     instance.manufacture_num = validated_data.get('picture', instance.picture)
    #     instance.price = validated_data.get('price', instance.price)
    #     instance.datasheet = validated_data.get('datasheet', instance.datasheet)
    #     instance.who = validated_data.get('who', instance.who)
    #     instance.review = validated_data.get('review', instance.review)
    #     instance.rating = validated_data.get('rating', instance.rating)
    #     instance.updated = validated_data.get('updated', instance.updated)
    #     instance.created = validated_data.get('created', instance.created)
    #     instance.save()
    #
    #     for comment_data in comment_data:
    #         comment = comments.pop(0)
    #         comment.who = comment_data.get('who', comment.who)
    #         comment.created = comment_data.get('created', comment.created)
    #         comment.comment = comment_data.get('comment', comment.comment)
    #         comment.up_vote = comment_data.get('up_vote', comment.up_vote)
    #         comment.down_vote = comment_data.get('down_vote', comment.down_vote)
    #         comment.save()
    #     return instance
