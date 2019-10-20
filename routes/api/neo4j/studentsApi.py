from flask_restful import Resource
from py2neo.ogm import GraphObject, Property, RelatedTo, RelatedFrom


class StudentsAPI(Resource):

    def get(self):
        return 404

    def get(self, fullname):
        return 404

    def get(self, uid):
        return 404

    def put(self, uid):
        return 404


class School(GraphObject):
    __primarykey__ = "name"

    name = Property()
    belt = Property()
    # discipline = Property()

    teaches = RelatedFrom("Discipline")

    def __init__(self, name, discipline):
        self.name = name
        self.discipline = discipline

    def __eq__(self, other):
        return self.discipline != other.discipline


class Student(GraphObject):
    __primarykey__ = "name"

    # properties
    name = Property()
    born = Property()
    discipline = Property()
    belt = Property()
    degree = Property()  # Optional

    # relationships
    trains_at = RelatedFrom(School)
    taught_by = RelatedTo("Instructor", "")

    # Compare
    def __lt__(self, other):
        return self.name < other.name


class Instructor(GraphObject):
    __primarykey__ = 'name'

    # properties

    name = Property()
    belt = Property()
    degree = Property()  # Optional

    #
    teaches = RelatedFrom(Student)

    # Compare
    def __lt__(self, other):
        return self.name < other.name


class Discipline(GraphObject):
    __primarykey__ = "name"  # E.g. 'Hapkido'

    name = Property()
    description = Property()
