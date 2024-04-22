from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken  # Importing RefreshToken
from rest_framework import status 
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes

class LogoutView(APIView):
     permission_classes = (IsAuthenticated,)

     def post(self, request):
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)  # Ensure correct import
               token.blacklist()  # Blacklist the token
               return Response(status=status.HTTP_205_RESET_CONTENT)  # Use proper status code
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)  # Handle exceptions

class SignUpView(APIView):
    def post(self, request):
        # Retrieve the data from the request
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        # Check for missing fields
        if not username or not email or not password:
            return Response(
                {'error': 'All fields are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if user already exists
        if User.objects.filter(username=username).exists():
            return Response(
                {'error': 'Username already taken.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {'error': 'Email already used.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create the user with hashed password
        user = User(
            username=username,
            email=email,
            password=make_password(password)  # Hashing the password
        )
        user.save()

        # Serialize the user data to return a response
        serializer = UserSerializer(user)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def get_user_details(request):
    user = request.user

    if request.method == 'GET':
        serializer = UserSerializer(user)  # Serialize user data
        return Response(serializer.data)  # Return serialized data

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data, partial=True)  # Support partial updates
        if serializer.is_valid():
            serializer.save()  # Save the changes
            return Response(serializer.data)  # Return updated data
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Handle validation errors